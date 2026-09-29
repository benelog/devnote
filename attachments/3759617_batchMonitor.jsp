<%@ page language="java" contentType="text/html; charset=EUC-KR"
	pageEncoding="EUC-KR"%>
<%@ page
	import="org.springframework.web.context.support.WebApplicationContextUtils"%>
<%@ page import="org.springframework.web.context.WebApplicationContext"%>
<%@ page import="javax.sql.DataSource"%>
<%@ page import="java.util.List"%>
<%@ page import="java.util.Map"%>
<%@ page import="java.util.HashMap"%>
<%@ page import="org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate"%>
<%@ page import="org.springframework.jdbc.core.ColumnMapRowMapper"%>
<%

	String startPosition = request.getParameter("startPosition");
	if(startPosition==null){
		startPosition = "1";
	} 
	int start = Integer.parseInt(startPosition) -1;
	
	String query = "select i.job_name, se.step_name,  se.status, se.exit_code, e.job_execution_id, se.start_time, se.end_time, se.read_count, se.write_count, se.exit_code, se.exit_message "
			+ "from BATCH_JOB_INSTANCE i, BATCH_JOB_EXECUTION e, BATCH_STEP_EXECUTION se "
			+ "	where i.job_name = :jobName "
			+ "	and e.job_instance_id = i.job_instance_id "
			+ " and se.job_execution_id = e.job_execution_id "
			+ " order by se.start_time desc limit :start ,30";
	WebApplicationContext ctx = WebApplicationContextUtils
			.getWebApplicationContext(getServletContext());
	DataSource ds = (DataSource) ctx.getBean("batchDataSource");
	NamedParameterJdbcTemplate db = new NamedParameterJdbcTemplate(ds);
	Map params = new HashMap();
	params.put("jobName", request.getParameter("jobName"));
	params.put("start", start);	
	List<Map<String, Object>> executions = db.query(query, params,
			new ColumnMapRowMapper());
	
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>batch monitor</title>
</head>
<body>
<h1>batch executions</h1>
<h2>conditions</h2>
<form>
<table>
	<tr>
		<td>job name</td>
		<td>
			<input name="jobName" value="<%=request.getParameter("jobName")%>"/>
		</td>
	</tr>
	<tr>
		<td>start position</td>
		<td>
			<input name="startPosition" value="<%=startPosition%>"/>		
		</td>
	</tr>
</table>
<p>
<input type="submit" value="find" onclick="form.submit()"/>
</p>
</form>
<h2>execution list</h2>
<table border="1">
	<tr>
		<th>job name</th>
		<th>step name</th>
		<th>status</th>		
		<th>start time</th>
		<th>end time</th>
		<th>read count</th>
		<th>write count</th>
		<th>exit message</th>						
	</tr>
	<% for (Map exec : executions ) { %>

		<tr>
			<td><%=exec.get("job_name")%></td>
			<td><%=exec.get("step_name")%> </td>
			<td><%=exec.get("status")%></td>
			<td><%=exec.get("start_time")%></td>
			<td><%=exec.get("end_time")%></td>						
			<td align="right"><%=exec.get("read_count")%></td>
			<td align="right"><%=exec.get("write_count")%></td>
			<td>
				<textarea><%=exec.get("exit_message")%></textarea>
			</td>						
		</tr>
	<% } %>
</table>
</body>
</html>